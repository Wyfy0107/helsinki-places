locals {
  common_tags = {
    Project     = var.project
    Environment = var.environment
  }
}

resource "aws_launch_configuration" "server" {
  name_prefix          = "${var.project}-${var.environment}"
  image_id             = data.aws_ami.ubuntu-image.id
  instance_type        = "t3.micro"
  iam_instance_profile = aws_iam_instance_profile.ec2.name

  key_name                    = aws_key_pair.ssh.key_name
  associate_public_ip_address = true

  user_data = file("${path.module}/../../scripts/server_init.sh")

  security_groups = [
    aws_security_group.ec2.id
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "server" {
  name_prefix               = "${var.project}-${var.environment}"
  max_size                  = 3
  min_size                  = 1
  desired_capacity          = 2
  default_cooldown          = 60
  health_check_grace_period = 300

  vpc_zone_identifier  = var.vpc_subnets_id
  launch_configuration = aws_launch_configuration.server.name
  health_check_type    = "ELB"
  termination_policies = ["OldestInstance", "OldestLaunchConfiguration"]
  target_group_arns = [
    aws_lb_target_group.server.arn
  ]

  tag {
    key                 = "Name"
    value               = "MyHelsinkiServer"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [desired_capacity]
  }
}

resource "aws_autoscaling_policy" "target_tracking" {
  name                   = "${var.project}-${var.environment}-target-tracking-policy"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = aws_autoscaling_group.server.name
  adjustment_type        = "ChangeInCapacity"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value     = 50
    disable_scale_in = false
  }
}

resource "aws_iam_role" "ec2" {
  name        = "${var.project}-${var.environment}"
  description = "allow codedeploy agent to download bundle"
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : "sts:AssumeRole",
          "Principal" : {
            "Service" : "ec2.amazonaws.com"
          }
        }
      ]
    }
  )
}

resource "aws_iam_role_policy" "ec2" {
  name = "${var.project}-${var.environment}"
  role = aws_iam_role.ec2.id
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : "s3:GetObject",
          "Resource" : "${var.web_s3_bucket_arn}/*"
        },
        {
          "Effect" : "Allow",
          "Action" : "ssm:GetParameters",
          "Resource" : "*"
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "kms:Decrypt"
          ],
          "Resource" : "${var.kms_arn}"
        }
      ]
    }
  )
}

resource "aws_iam_instance_profile" "ec2" {
  name = "${var.project}-${var.environment}"
  role = aws_iam_role.ec2.id
}

resource "aws_key_pair" "ssh" {
  key_name   = "${var.project}-${var.environment}-ec2-ssh-key"
  public_key = file("${path.module}/instance.key.pub")
}
