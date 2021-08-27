import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ColorModeScript } from "@chakra-ui/core"

export default class CustomDocument extends NextDocument {
  static getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript/>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
