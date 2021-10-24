resource "aws_codedeploy_app" "server" {
  compute_platform = "Server"
  name             = "MyHelsinkiServer"
}

resource "aws_iam_role" "codedeploy" {
  name = "MyHelsinkiCodedeployRole"

  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "",
          "Effect" : "Allow",
          "Principal" : {
            "Service" : "codedeploy.amazonaws.com"
          },
          "Action" : "sts:AssumeRole"
        }
      ]
    }
  )
}

resource "aws_iam_role_policy_attachment" "codedeploy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
  role       = aws_iam_role.codedeploy.name
}

resource "aws_codedeploy_deployment_group" "server" {
  app_name              = aws_codedeploy_app.server.name
  deployment_group_name = "MyHelsinkiDeploymentGroup"
  service_role_arn      = aws_iam_role.codedeploy.arn
  autoscaling_groups = [
    module.asg.autoscaling_group_name
  ]

  ec2_tag_set {
    ec2_tag_filter {
      key   = "Name"
      type  = "KEY_AND_VALUE"
      value = "MyHelsinkiServer"
    }
  }
}

resource "aws_elasticache_cluster" "server" {
  cluster_id           = "helsinki-places-redis-cache"
  engine               = lookup(var.redis_config, "engine")
  node_type            = lookup(var.redis_config, "node_type")
  num_cache_nodes      = lookup(var.redis_config, "num_cache_nodes")
  parameter_group_name = lookup(var.redis_config, "parameter_group_name")
  engine_version       = lookup(var.redis_config, "engine_version")
  port                 = lookup(var.redis_config, "port")
  security_group_ids   = [aws_security_group.redis.id]
  subnet_group_name    = aws_elasticache_subnet_group.redis.name

  tags = local.common_tags
}

resource "aws_security_group" "redis" {
  name   = "redis-sgs"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port = 6379
    to_port   = 6379
    protocol  = "tcp"
    # cluster is not exposed to internet, only ec2 in vpc can connect
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "elasticcache-subnet-group"
  subnet_ids = module.vpc.vpc_subnets_id
}

resource "aws_ssm_parameter" "endpoint" {
  name        = "/production/server/redis/endpoint"
  description = "redis secret"
  type        = "SecureString"
  value       = aws_elasticache_cluster.server.cache_nodes[0].address
  key_id      = aws_kms_key.secret.id

  tags = local.common_tags
}

resource "aws_ssm_parameter" "port" {
  name        = "/production/server/redis/port"
  description = "redis secret"
  type        = "SecureString"
  value       = aws_elasticache_cluster.server.cache_nodes[0].port
  key_id      = aws_kms_key.secret.id

  tags = local.common_tags
}


resource "aws_kms_key" "secret" {
  description             = "redis secret encryption"
  key_usage               = "ENCRYPT_DECRYPT"
  deletion_window_in_days = 10
}
