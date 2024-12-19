# niubiz-pay

Typescript library to integrate decoupled forms from Niubiz

## Install

```bash
npm i niubiz-pay@latest
```

## Usage

```typescript
    import { useNiubiz } from 'niubiz-pay';

    const MDD: MerchantDefineData = useMemo(() => ({
        MDD4: 'mail@mail.com',
        MDD32: '12345789',
        MDD75: 'Registrado',
        MDD77: '0',
    }), []);

     const { FormComponent, triggerOpenForm, formResponse } = useNiubiz(
        "userniubiz@mail.com",
        Math.floor(Math.random() * 120000) + 1, // Transaction number
        "https://apisandbox.vnforappstest.com",
        "/api.security/v1/security",
        "/api.ecommerce/v2/ecommerce/token/session",
        "/api.ecommerce/v2/ecommerce/token/card",
        "https://pocpaymentserve.s3.amazonaws.com/payform.min.js",
        "https://pocpaymentserve.s3.amazonaws.com/payform.min.css",
        MDD,
        "payform",
        "payform",
        amount,
        "Z2lhbmNhZ2FsbGFyZG9AZ21haWwuY29tOkF2MyR0cnV6",
        merchantId ?? "110777209",
        token,
        sessionKey,
        <CustomLoader> //Optional
    );

    useEffect(() => {
        console.log('Respuesta del formulario Tokenizer 😁', formResponse);

    }, [formResponse]);
```

### Component 

```html
    <div>
        {FormComponent}
        <button onClick={triggerOpenForm}>Open Form</button>
    </div>
```
## Payment
```typescript
    import { useNiubizPay } from 'niubiz-pay';

    const MDD: MerchantDefineData = useMemo(() => ({
        MDD4: 'mail@mail.com',
        MDD32: '12345789',
        MDD75: 'Registrado',
        MDD77: '0',
    }), []);

    const { FormComponent, triggerOpenForm, triggerSendForm, formResponse, triggerResetForm } = useNiubizPay(
        "userniubiz@mail.com",
        "0", // 0 – DNI; 1 – Carnet de extranjería; 2 – Pasaporte
        "44554444", // Document
        Math.floor(Math.random() * 120000) + 1, // Transaction number
        "https://apisandbox.vnforappstest.com",
        "/api.security/v1/security",
        "/api.ecommerce/v2/ecommerce/token/session",
        "/api.authorization/v3/authorization/ecommerce",
        "https://pocpaymentserve.s3.amazonaws.com/payform.min.js",
        "https://pocpaymentserve.s3.amazonaws.com/payform.min.css",
        MDD,
        "web",
        "web",
        amount,
        "Z2lhbmNhZ2FsbGFyZG9AZ21haWwuY29tOkF2MyR0cnV6",
        merchantId ?? "110777209",
        token,
        sessionKey,
        <CustomLoader> //Optional
    );

    useEffect(() => {
        console.log('Response niubiz payment 😁', formResponse);

    }, [formResponse]);
```

### Component 

```html
    <div>
        <button onClick={triggerOpenForm}>Open Form</button>
        <button onClick={triggerResetForm}>Reset Form</button>
        <button onClick={triggerSendForm}>Send Form</button>
        {FormComponent}
    </div>
```