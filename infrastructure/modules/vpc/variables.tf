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
