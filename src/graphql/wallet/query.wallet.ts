import { gql } from "@apollo/client";

export const GET_WALLET = gql`
  query GetWallet {
    getWallet {
      address
      balance
      createdAt
      userId
      updatedAt
      publicKey
    }
  }
`;
