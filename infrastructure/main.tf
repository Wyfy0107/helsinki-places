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
  cluster_id           = "cluster-example"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = 6379
  security_group_ids   = [aws_security_group.redis.id]
  subnet_group_name    = aws_elasticache_subnet_group.redis.name

  tags = local.common_tags
}

resource "aws_security_group" "redis" {
  name   = "redis-sgs"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [module.asg.ec2_sgs_id]
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
