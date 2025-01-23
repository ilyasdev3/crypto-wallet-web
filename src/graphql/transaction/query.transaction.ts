import { gql } from "@apollo/client";

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions(
    $input: UserTransactionInput!
    $pagination: PaginationInput = { limit: 10, page: 1 }
  ) {
    getUserTransactions(input: $input, pagination: $pagination) {
      transactions {
        id
        amount
        status
        senderWalletId
        receiverWalletId
        contractId
        transactionHash
        type
        createdAt
        updatedAt
      }
      pageInfo {
        totalItems
        totalPages
        currentPage
      }
    }
  }
`;
