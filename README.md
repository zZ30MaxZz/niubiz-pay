# niubiz-pay

Typescript library to integrate decoupled forms from Niubiz

## Install

```bash
npm i niubiz-pay@latest
```

## Usage

```typescript
    const MDD: MerchantDefineData = useMemo(() => ({
        MDD4: 'mail@mail.com',
        MDD32: '12345789',
        MDD75: 'Registrado',
        MDD77: '0',
    }), []);

     const { FormComponent, triggerOpenForm } = useNiubiz(
        "userniubiz@mail.com",
        Math.floor(Math.random() * 120000) + 1,
        "https://apisandbox.vnforappstest.com",
        "/api.security/v1/security",
        "/api.ecommerce/v2/ecommerce/token/session",
        "/api.ecommerce/v2/ecommerce/token/card",
        "https://pocpaymentserve.s3.amazonaws.com/payform.min.js",
        "https://pocpaymentserve.s3.amazonaws.com/payform.min.css",
        MDD,
        "web",
        "web",
        amount,
        "Z2lhbmNhZ2FsbGFyZG9AZ21haWwuY29tOkF2MyR0cnV6",
        merchantId ?? "110777209",
        token,
        sessionKey
    );
```

### Component 

```html
    <div>
        {FormComponent}
    </div>
```