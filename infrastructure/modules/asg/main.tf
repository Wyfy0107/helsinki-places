locals {
  common_tags = {
    Project     = var.project
    Environment = var.environment
  }
}

resource "aws_launch_configuration" "server" {
  name_prefix   = "${var.project}-${var.environment}"
  image_id      = data.aws_ami.ubuntu-18_04.id
  instance_type = "t2.micro"

  key_name                    = aws_key_pair.demo.key_name
  associate_public_ip_address = true

  user_data = file("${path.module}/../../scripts/codedeploy-agent.sh")

  security_groups = [
    aws_security_group.instance.id
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "server" {
  name_prefix      = "${var.project}-${var.environment}"
  max_size         = 3
  min_size         = 1
  default_cooldown = 60

  vpc_zone_identifier  = var.vpc_subnets_id
  launch_configuration = aws_launch_configuration.demo.name
  health_check_type    = "ELB"
  termination_policies = ["OldestInstance", "OldestLaunchConfiguration"]
  target_group_arns = [
    aws_lb_target_group.demo.arn
  ]

  tags = merge(local.common_tags, {
    "Name" : "MyHelsinkiServer"
  })


  lifecycle {
    create_before_destroy = true
  }

}

resource "aws_autoscaling_policy" "target_tracking" {
  count                  = 1
  name                   = "${var.project}-${var.environment}-target-tracking-policy"
  policy_type            = "TargetTrackingScaling"
  autoscaling_group_name = aws_autoscaling_group.server.name
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 60
  scaling_adjustment     = 1

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "EC2SpotFleetRequestAverageCPUUtilization"
    }
    target_value     = 50
    disable_scale_in = false
  }
}

resource "aws_key_pair" "ssh" {
  key_name   = "${project}-${environemnt}-ec2-ssh-key"
  public_key = file("${path.module}/instance.key.pub")
}
