# Content Summarizer Chrome Extension

A Chrome extension that extracts content from web pages and generates concise summaries using the Gemini AI API. The extension features a modern UI with a clean, professional design and efficient content processing capabilities.

## Features

- **Content Extraction**: Automatically extracts content from web pages with ID 'posts-content'
- **AI-Powered Summarization**: Utilizes Gemini AI API to generate human-like summaries
- **Modern UI/UX**: Clean, responsive interface with a professional blue theme
- **Copy Functionality**: One-click copying of generated summaries
- **Loading States**: Visual feedback during content processing
- **Error Handling**: Comprehensive error management with user-friendly notifications

## Installation

1. Clone this repository or download the source code

```bash
git clone [repository-url]
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any webpage containing a div with ID 'posts-content'

2. Click the extension icon in your Chrome toolbar

3. Click the "Fetch & Summarize" button to generate a summary

4. Use the "Copy" button to copy the generated content to your clipboard

## Project Structure

```
content-summarizer/
├── manifest.json
├── popup.html      # Extension popup interface
├── popup.js        # Main extension logic
└── README.md       # Documentation
```

## Configuration

### API Setup

1. Obtain a Gemini AI API key from Google Cloud Console
2. Replace the API key in `popup.js`:

```javascript
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY";
```

### Customization

- Modify the color scheme in `popup.html` by updating the CSS variables:

```css
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  /* ... other variables ... */
}
```

## Technical Details

### Dependencies

- Chrome Extensions API
- Gemini AI API
- Modern browser features (Clipboard API)

### Browser Compatibility

- Chrome 88+
- Edge 88+ (Chromium-based)

## Security Considerations

- The extension only accesses content from the active tab when explicitly triggered
- API key should be stored securely and not exposed in public repositories
- Content is processed locally before being sent to the Gemini API
- No user data is stored persistently

## Development

### Local Development

1. Make changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Click the refresh icon on the extension card

### Building for Production

1. Update manifest version
2. Remove any console.log statements
3. Optimize assets
4. Create a zip file of the extension directory

## Troubleshooting

Common issues and solutions:

1. **Content Not Found**

   - Ensure the webpage has a div with ID 'posts-content'
   - Check console for specific error messages

2. **API Errors**

   - Verify API key is valid and properly configured
   - Check network tab for detailed error responses

3. **Extension Not Working**
   - Ensure extension permissions are properly set
   - Try reloading the extension
   - Clear browser cache

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Cloud Platform for Gemini AI API
- Chrome Extensions Documentation
- Modern UI/UX best practices

## Version History

- 1.0.0: Initial release
  - Base functionality
  - Modern UI implementation
  - Copy feature
  - Error handling
