# Typescript Flat Decoder

<p align="left">
<img alt="Tests" src="https://github.com/cardano-foundation/cf-flat-decoder-ts/actions/workflows/test.yml/badge.svg?branch=main" />
<img alt="Coverage" src="https://cardano-foundation.github.io/cf-flat-decoder-ts/coverage-report/coverage-jest%20coverage.svg" />
<img alt="Release" src="https://github.com/cardano-foundation/cf-flat-decoder-ts/actions/workflows/release.yml/badge.svg?branch=main" />
<img alt="Publish" src="https://github.com/cardano-foundation/cf-flat-decoder-ts/actions/workflows/publish.yml/badge.svg?branch=main" />
<img alt="Bundle" src="https://github.com/cardano-foundation/cf-flat-decoder-ts/actions/workflows/bundle.yml/badge.svg?branch=main" />
<a href="https://conventionalcommits.org"><img alt="conventionalcommits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits" /></a>
<a href="https://discord.gg/4WVNHgQ7bP"><img alt="Discord" src="https://img.shields.io/discord/1022471509173882950"></a>
</p>

This project aims to provide a [flat binary](https://github.com/Quid2/flat) decoder. It is written in Typescript and can be used in both NodeJS and the browser.

## Getting Started

```
npm i @cardano-foundation/cf-flat-decoder-ts
```

## Usage

You can use the decoder in node backend but also in the browser. This example shows how to use it in a React app.

```typescript
import { useState } from 'react';
import { decodeFlatUplc, Term } from '@cardano-foundation/cf-flat-decoder-ts';

function App() {
  const [deserializeContract, setDeserializeContract] = useState(
    '59050c010000333323232323232323232323232323232323232323232323222232222533301a3375e0049801018000132323232533301e323001222222333301b232333322323232533302c3370e9000001080d8a99981619b87480100084c068c0b80044cc8cc0748c888c00800cc0c8004dd48009bae302e001004302f00230240013754004605260500020064a66605066e1ccc070014dd59815001240042602c6eb0c8c8c8c8c8c8c8c8c8c8c8c8c8c803d4ccc0d000452616303500653330333370e90000010991919299981b29981419b87001480004cdc3800a40702646493299981b0008a4c2c606e0082c6e34004dd7000981a8008a99981999b87480080084c926533303200114985858c0d8008c0ac004dd500098188009817803299981699b87480000084c8c8c8c8c8c8c9265333032001149858c0cc0194ccc0c4cdc3a400000426464646464646493299981b0008a4c2c606e0066eb4004c0d8004c0d000ccc8c0c4894ccc0d000440c04cc0c4c00cc0dc004c008c0d80048c94ccc0d0cdc39b8d001480e0400858dd70009bac001303300116303400230290013754002605e0022a66605a66e1d20020021324994ccc0b0004526161630300023025001375400260560026eb0004405c4894004c09cc0a4c0a0c09cc0a400401094cc060ccc07d281191800911191980e91999980e9191118010019bab303200137520066eacc0bcc0b8c0c0c0bcc0b8c0c00048cc07c94ccc0bccdc4a40046eb4c0cc0044c010dd718148008a5000114a0006466e212000330200010043232233300100b003002375c0046604a44a666050002201026604a60560026004605400200e6050604e002266603e9408c8cdc49bad302a3029001333026222533302a00110021330033370000490011816000a4000664604e44a666054002204c264a66605860080022660500026006605a00426006605a004605a00266444660060020044604e44a666054002294054ccc0accdd798168008018a5113002302c00100637586054002605400260500022940c8c8c8c8c88cccccc00401801401000c038008dd59812181198118029bac30230043758604400a6eb0c084014dd598100010a4c2c64603e6036002603c0026032603a0026038002603a6038603a002266666030444a666038002244a0022a66603a6004603e002264446004006603e002266006004603c00246466ebc00401cc8c078c07c004c8c078c07c004c074c070c078004c8dd6180e980f000980e180e800924c2c6eb8008888c00800c894004888cc044894ccc050004489400454ccc054cdd79807980b80080209802980b80089801180b000800918071129998088008a5015330043003301400113002301300123300f00100214a2446666660060100246ea40080048ccc01c88cdc01bad301500200148000dd58008a40004444666600a6600c0080040024644460040066008002244a0024601244a666018002244a0022666006601e002444600400626004601c002444a66601866ebc008c00c004488c00800c489400488c020894ccc02c004400c4cc010c038004c008c034004888c8c8c94ccc034cdc3a4004004200c2600a601e0026020004600a0026ea800555cea5eb815d0118029802800919180111980100100091801119801001000aab9f5734ae895d0918011baa0015573c9810100004c011e581c9cae3d41ae05882f5f357f0042d71842f1cc8a8e5230411ddb4daf17004c0122d87a9f581cca925263da4c59bf675f3cc485c894575cfe9b2b50ae5c3a360a62cdff0001'
  );
  const [uplc, setUplc] = useState('');

  const handleGetUplc = () => {
    const uplc = decodeFlatUplc(deserializeContract);
    setUplc(uplc);
    Term.indent = 5; //Reset indent
  };

  return (
    <>
      <h1>Flat decoder</h1>
      <div>
        <input
          value={deserializeContract}
          onChange={(e) => {
            setDeserializeContract(e.target.value);
          }}
        />
        <button onClick={handleGetUplc}>Get uplc</button>
      </div>
      <div
        style={{ margin: '10px 0', padding: 10, whiteSpace: 'nowrap' }}
        dangerouslySetInnerHTML={{ __html: uplc }}
      ></div>
    </>
  );
}

export default App;
```
