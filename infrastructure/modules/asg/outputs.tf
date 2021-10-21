output "load_balancer_dns" {
  value = aws_lb.demo.dns_name
}

output "autoscaling_group_name" {
  value = aws_autoscaling_group.demo.name
}

output "hosted_zone_id" {
  value = data.aws_route53_zone.selected.zone_id
}
