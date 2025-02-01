import soap from 'soap';

export const createSoapClient = async (wsdlUrl: string) => {
  return soap.createClientAsync(wsdlUrl);
};
