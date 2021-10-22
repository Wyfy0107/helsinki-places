locals {
  common_tags = {
    Project     = var.project
    Environment = var.environment
  }
}

resource "aws_launch_configuration" "server" {
  name_prefix   = "${var.project}-${var.environment}"
  image_id      = data.aws_ami.ubuntu-20_04.id
  instance_type = "t2.micro"

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
  name_prefix      = "${var.project}-${var.environment}"
  max_size         = 3
  min_size         = 1
  default_cooldown = 60

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
  key_name   = "${var.project}-${var.environment}-ec2-ssh-key"
  public_key = file("${path.module}/instance.key.pub")
}

resource "aws_route53_record" "web" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = var.server_domain_name
  type    = "A"

  alias {
    name                   = aws_lb.server.dns_name
    zone_id                = aws_lb.server.zone_id
    evaluate_target_health = true
  }
}
