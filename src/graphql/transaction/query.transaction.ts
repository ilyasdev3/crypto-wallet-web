import { gql } from "@apollo/client";

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($input: UserTransactionInput) {
    getUserTransactions(input: $input) {
      address
      amount
      contractId
      createdAt
      receiverWalletId
      id
      senderWalletId
      status
      type
      transactionHash
      updatedAt
    }
  }
`;
