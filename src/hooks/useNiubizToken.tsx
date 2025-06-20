import { useState, useCallback, useEffect, useMemo } from "react";
import {
  DataResponse,
  MerchantDefineData,
  SessionRequest,
  TokenSessionReturn,
  UseNiubizReturn,
} from "../components/types";
import CustomTokenForm from "../components/CustomForm/CustomTokenForm";
import GetNiubizToken from "../helper/GetNiubizToken";
import GetNiubizTokenSession from "../helper/GetNiubizTokenSession";
import Loader from "../components/Loader/Loader";

const useNiubizToken = (
  userEmail: string,
  purchasenumber: number,
  srcCustomScript: string,
  srcCustomCss: string,
  MDD: MerchantDefineData,
  channelSession: string,
  channelToken: string,
  amount: string,
  merchandId?: string | null,
  token?: string | null,
  sessionKey?: string | null,
  showAliasCard?: boolean,
  showCheckSaveCard?: boolean,
  buttonText?: string,
  loader?: JSX.Element
): UseNiubizReturn => {
  const baseUrl = "https://apisandbox.vnforappstest.com";
  const tokenService = "/api.security/v1/security";
  const sessionService = "/api.ecommerce/v2/ecommerce/token/session";
  const credentialEncoded = "Z2lhbmNhZ2FsbGFyZG9AZ21haWwuY29tOkF2MyR0cnV6";

  const [showForm, setShowForm] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [scriptsLoaded, setScriptsLoaded] = useState<boolean>(false);

  const [tokenSecurity, setTokenSecurity] = useState<string | null>();
  const [tokenSession, setTokenSession] = useState<TokenSessionReturn | null>();

  const memoizedMDD = useMemo(() => MDD, [MDD]);
  const [formResponse, setFormResponse] = useState<DataResponse>({
    success: false,
    code: "000",
    data: null
  });

  const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Error loading script: ${src}`));
      document.body.appendChild(script);
    });
  };

  const triggerOpenForm = useCallback(() => {
    setShowLoader(true);
    const loadResources = async () => {
      try {
        await Promise.all([loadScript(srcCustomScript)]);
        setScriptsLoaded(true);

        loadCustomTag();
      } catch (error) {
        const dataResponse = {
          success: false,
          code: "001",
          data: error
        }

        setFormResponse(dataResponse);
      }
    };

    loadResources();
  }, [srcCustomScript]);

  useEffect(() => {
    if (!scriptsLoaded) {
      return;
    }

    if (token && token !== '') {
      setShowLoader(false);
      setShowForm(true);
    }

    const handleGetTokenSecurity = async () => {
      if ((token && token !== '') || !credentialEncoded) return;

      const url = `${baseUrl}${tokenService}`;

      const response = await GetNiubizToken(url, credentialEncoded);

      if (response.success) {
        setTokenSecurity(response.data);
      }
      else {
        setFormResponse(response);

        setShowLoader(false);
        setShowForm(false);
      }
    };

    handleGetTokenSecurity();

  }, [scriptsLoaded, baseUrl, tokenService, credentialEncoded]);

  useEffect(() => {
    if (tokenSecurity) {
      const handleGetTokenSession = async () => {
        if (sessionKey && sessionKey !== '') return;

        const url = `${baseUrl}${sessionService}/${merchandId}`;

        let requestParams: SessionRequest = {
          amount: amount,
          antifraud: {
            merchantDefineData: memoizedMDD,
          },
          channel: channelSession,
        };

        const response = await GetNiubizTokenSession(url, tokenSecurity, requestParams);

        if (response.success) {
          setTokenSession(response.data);
        }
        else {
          setFormResponse(response);

          setShowLoader(false);
          setShowForm(false);
        }

        setShowLoader(false);
      };

      handleGetTokenSession();
    }
  }, [tokenSecurity, baseUrl, sessionService, merchandId, memoizedMDD, channelSession]);

  useEffect(() => {
    if (tokenSession && tokenSecurity) {
      setShowForm(true);
    }
  }, [tokenSession, tokenSecurity]);

  const handleOnClose = () => {
    setShowForm(false);
    setScriptsLoaded(false);
    setTokenSession(null);
    setTokenSecurity(null);
  };

  const FormComponent =
    showLoader ?
      loader ?? <Loader color="#fff" size={40} /> :
      showForm ?
        <CustomTokenForm
          setFormResponse={setFormResponse}
          showForm={showForm}
          srcCss={srcCustomCss}
          tokenSession={sessionKey ?? tokenSession?.sessionKey}
          merchandId={merchandId ?? ""}
          purchasenumber={purchasenumber}
          onClose={handleOnClose}
          userEmail={userEmail}
          channelToken={channelToken}
          amount={amount}
          baseUrl={baseUrl}
          loader={loader}
          showAliasCard={showAliasCard}
          showCheckSaveCard={showCheckSaveCard}
          buttonText={buttonText}
        /> :
        <></>;

  const loadCustomTag = async () => {
    console.log('Librerias listas para usar');
  };

  return { FormComponent, triggerOpenForm, formResponse };
};

export default useNiubizToken;
