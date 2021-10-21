variable "region" {
  default = "eu-north-1"
}

variable "aws_access_key" {

}

variable "aws_secret_key" {

}

variable "project" {

}

variable "environment" {

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
