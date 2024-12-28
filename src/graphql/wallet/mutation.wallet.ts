import { gql } from "@apollo/client";

export const TRANSFER_FUNDS = gql`
  mutation Mutation($transferFunds: TransferFundsInput!) {
    transferFunds(transferFunds: $transferFunds) {
      message
    }
  }
`;

export const WITHDRAW_FUNDS = gql`
  mutation Mutation($withdrawFunds: WithdrawFundsInput!) {
    withdrawFunds(withdrawFunds: $withdrawFunds) {
      message
    }
  }
`;
