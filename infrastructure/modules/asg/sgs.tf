resource "aws_security_group" "ec2" {
  name   = "ec2-sgs"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["88.114.118.6/32"]
    protocol    = "tcp"
  }

  ingress {
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.loadbalancer.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = -1
  }
}

resource "aws_security_group" "loadbalancer" {
  name   = "lb-sgs"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = "tcp"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = -1
  }
}
