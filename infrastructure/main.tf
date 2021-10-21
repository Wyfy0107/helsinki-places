resource "aws_codedeploy_app" "server" {
  compute_platform = "Server"
  name             = "MyHelsinkiServer"
}

resource "aws_iam_role" "codedeploy" {
  name = "MyHelsinkiCodedeployRole"

  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "",
          "Effect" : "Allow",
          "Principal" : {
            "Service" : "codedeploy.amazonaws.com"
          },
          "Action" : "sts:AssumeRole"
        }
      ]
    }
  )
}

resource "aws_iam_role_policy_attachment" "codedeploy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
  role       = aws_iam_role.codedeploy.name
}

resource "aws_codedeploy_deployment_group" "server" {
  app_name              = aws_codedeploy_app.server.name
  deployment_group_name = "MyHelsinkiDeploymentGroup"
  service_role_arn      = aws_iam_role.codedeploy.arn
  autoscaling_groups = [
    module.asg.autoscaling_group_name
  ]

  ec2_tag_set {
    ec2_tag_filter {
      key   = "Name"
      type  = "KEY_AND_VALUE"
      value = "MyHelsinkiServer"
    }
  }
}

