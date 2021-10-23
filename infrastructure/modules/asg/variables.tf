variable "project" {
  type = string
}

variable "environment" {
  type = string
}

variable "vpc_cidr" {
  description = "cidr block for vpc"
  type        = string
}

variable "public_subnets_cidr" {
  type = list(string)
}

variable "server_certificate_arn" {
  type = string
}

variable "server_domain_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "vpc_subnets_id" {
  type = list(string)
}
