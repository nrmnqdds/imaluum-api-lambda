import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ImaluumApiLambdaStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		const fn = new NodejsFunction(this, "imaluumbackend-lambda", {
			entry: "lambda/index.ts",
			handler: "handler",
			runtime: lambda.Runtime.NODEJS_20_X,
		});
		fn.addFunctionUrl({
			authType: lambda.FunctionUrlAuthType.NONE,
		});
		new apigw.LambdaRestApi(this, "imaluumbackend-api", {
			handler: fn,
		});

		// The code that defines your stack goes here

		// example resource
		// const queue = new sqs.Queue(this, 'ImaluumApiLambdaQueue', {
		//   visibilityTimeout: cdk.Duration.seconds(300)
		// });
	}
}
