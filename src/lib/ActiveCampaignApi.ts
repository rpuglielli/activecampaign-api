import { HttpException, InternalServerErrorException } from '@nestjs/common';

import axios, { AxiosError } from 'axios';

import { activeCampaign } from '../config';

const { account, apiVersion, token } = activeCampaign;

const ActiveCampaign = axios.create({
  baseURL: `https://${account}.api-us1.com/api/${apiVersion}`,
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': token,
  },
});

ActiveCampaign.interceptors.response.use(({ data }) => data, errorHandler);

export default ActiveCampaign;

function errorHandler(error: HttpException | AxiosError) {
  if (error instanceof HttpException) {
    throw error;
  }
  const baseMessage = 'Error attempting to request ActiveCampaign API';

  if (error.response) {
    throw new HttpException(
      {
        status: error.response.status,
        message: baseMessage,
        errorDetail: error.response.data,
      },
      error.response.status,
    );
  } else if (error.request) {
    throw new InternalServerErrorException(
      `${baseMessage}. The request was made but no response was received`,
    );
  } else {
    throw new InternalServerErrorException(
      `${baseMessage}. Something happened while setting up the request`,
    );
  }
}
