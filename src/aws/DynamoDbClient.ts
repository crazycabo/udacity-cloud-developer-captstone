import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { createLogger } from '../utils/Logger'
import { TestCase } from '../models/TestCase'
import { CreateTestCaseRequest } from '../requests/CreateTestCaseRequest'
import { getUserId } from './Utils'
import * as uuid from 'uuid'

const logger = createLogger('dynamoDb')

const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()
const testCaseTable = process.env.TESTCASE_TABLE
const testCaseUserIndex = process.env.TESTCASE_USER_INDEX

export async function getTestCases(event: APIGatewayProxyEvent): Promise<TestCase[]> {
  const userId = getUserId(event)

  logger.info(`Get testcases for user ID: ${userId}`)

  const result = await docClient.query({
    TableName: testCaseTable,
    IndexName: testCaseUserIndex,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }).promise()

  return result.Items as TestCase[]
}

export async function createTestCase(event: APIGatewayProxyEvent): Promise<TestCase> {
  const parsedEventBody: CreateTestCaseRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  const testCase = {
    id: uuid.v4(),
    userId: userId,
    createdAt: new Date().toISOString(),
    ...parsedEventBody
  }

  logger.info(`Create testcase from event: ${testCase}`)

  await docClient.put({
    TableName: testCaseTable,
    Item: testCase
  }).promise()

  return testCase
}

// export async function updateTestCase(event: APIGatewayProxyEvent): Promise<TestCase> {
//
// }
//
// export async function deleteTestCase(event: APIGatewayProxyEvent) {
//
// }
