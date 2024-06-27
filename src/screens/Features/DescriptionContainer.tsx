import React from 'react';
import { View, Text } from 'react-native';
import HTML from 'react-native-render-html';


// Component to render HTML and extract text
const HtmlToPlainText = ({ htmlContent }) => {
  // Function to extract plain text from HTML
  const extractTextFromHtml = (html) => {
    // Remove HTML tags using a regex (not perfect but works for basic cases)
    return html ? html.replace(/<[^>]*>?/gm, '') : '';
  };

  // Render HTML and extract plain text
  return (
    <View>
      <HTML
        source={{ html: htmlContent }}
        contentWidth={300} // Width of the rendered content
        renderers={{
          // Use renderers to customize how specific HTML tags are rendered
          a: (htmlAttribs, children, convertedCSSStyles, passProps) => {
            // Render anchor tags (links) differently if needed
            return <Text>{children}</Text>;
          },
        }}
      />
      <Text style={{ marginTop: 10 }}>{extractTextFromHtml(htmlContent)}</Text>
    </View>
  );
};


export default HtmlToPlainText