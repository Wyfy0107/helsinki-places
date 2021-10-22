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

variable "certificate_arn" {
  type = string
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
