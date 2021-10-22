output "load_balancer_dns" {
  value = aws_lb.server.dns_name
}

output "autoscaling_group_name" {
  value = aws_autoscaling_group.server.name
}

output "hosted_zone_id" {
  value = data.aws_route53_zone.selected.zone_id
}
