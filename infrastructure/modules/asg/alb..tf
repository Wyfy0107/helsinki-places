resource "aws_lb" "server" {
  name               = "${var.project}-${var.environment}"
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    aws_security_group.loadbalancer.id
  ]
  subnets                          = var.vpc_subnets_id
  enable_cross_zone_load_balancing = true

  tags = local.common_tags
}

resource "aws_lb_target_group" "server" {
  name     = "${var.project}-${var.environment}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    unhealthy_threshold = 6
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.server.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      status_code = "HTTP_302"
      port        = 443
      protocol    = "HTTPS"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.server.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.server.arn
  }
}

resource "aws_route53_record" "ecs" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "places.mlem-mlem.net"
  type    = "A"

  alias {
    name                   = aws_lb.server.dns_name
    zone_id                = aws_lb.server.zone_id
    evaluate_target_health = true
  }
}
