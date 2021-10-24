locals {
  s3_origin_id = "MyHelsinkiS3Origin"
  common_tags = {
    Project     = var.project
    Environment = var.environment
  }
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.web_domain_name}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.web.iam_arn]
    }
  }
}

resource "aws_s3_bucket" "revision" {
  bucket = "${var.project}-${var.environment}-app-revision"
  acl    = "private"
  tags = merge(local.common_tags, {
    "Name" : "revision"
  })
}

resource "aws_s3_bucket" "web" {
  bucket        = var.web_domain_name
  acl           = "private"
  force_destroy = true
  policy        = data.aws_iam_policy_document.s3_policy.json

  website {
    index_document = "index.html"
  }

  tags = merge(local.common_tags, {
    "Name" : "MyHelsinkiWebsite"
  })
}

data "aws_iam_policy_document" "web_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.web.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.web.iam_arn]
    }
  }
}

resource "aws_route53_record" "web" {
  zone_id = module.asg.hosted_zone_id
  name    = var.web_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.web.domain_name
    zone_id                = aws_cloudfront_distribution.web.hosted_zone_id
    evaluate_target_health = true
  }
}


resource "aws_cloudfront_origin_access_identity" "web" {
  comment = "OAI for my helsinki website"
}

resource "aws_cloudfront_distribution" "web" {
  aliases = [var.web_domain_name]
  comment = "Helsiki Places Web Distribution"

  origin {
    domain_name = aws_s3_bucket.web.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.web.cloudfront_access_identity_path
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 300
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["DE", "FI", "SE"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = var.web_certificate_arn
    ssl_support_method  = "sni-only"
  }
}

