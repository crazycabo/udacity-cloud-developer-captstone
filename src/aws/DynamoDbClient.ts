import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { createLogger } from '../utils/Logger'
import * as uuid from 'uuid'

const logger = createLogger('dynamoDb')

const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()
const testCaseTable = process.env.TESTCASE_TABLE

export async function getTestCases(event: APIGatewayProxyEvent): Promise<TestCase[]> {

}

export async function createTestCase(event: APIGatewayProxyEvent): Promise<TestCase> {

}

export async function updateTestCase(event: APIGatewayProxyEvent): Promise<TestCase> {

}

export async function deleteTestCase(event: APIGatewayProxyEvent) {

}
