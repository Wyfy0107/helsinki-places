data "aws_ami" "ubuntu-image" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_route53_zone" "selected" {
  name = "mlem-mlem.net"
}
