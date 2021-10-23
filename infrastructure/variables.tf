variable "region" {
  default = "eu-north-1"
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}

variable "project" {
  type = string
}

variable "environment" {
  type = string
}

variable "server_certificate_arn" {
  description = "cert for backend server"
  type        = string
}

variable "web_certificate_arn" {
  description = "cert for s3 webstire"
  type        = string
}

variable "vpc_cidr" {
  type = string
}

variable "public_subnets_cidr" {
  type = list(string)
}

variable "web_domain_name" {
  type = string
}

variable "server_domain_name" {
  type = string
}
