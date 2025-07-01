from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(text, output_path, size=(300, 300), bg_color=(255, 255, 255), text_color=(0, 0, 0)):
    # Create a new image with white background
    image = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(image)
    
    # Try to load a font, fall back to default if not available
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position to center it
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Draw the text
    draw.text((x, y), text, font=font, fill=text_color)
    
    # Save the image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    image.save(output_path)

def generate_all_placeholders():
    # Categories and their words
    categories = {
        'body': ['kichwa', 'nywele', 'jicho', 'masikio', 'pua', 'kinywa', 'midomo', 'meno', 
                'ulimi', 'shingo', 'bega', 'kifua', 'mkono', 'kiwiko', 'vidole', 'tumbo', 
                'mguu', 'goti'],
        'colors': ['nyekundu', 'bluu', 'kijani', 'manjano', 'nyeusi', 'nyeupe', 'machungwa', 
                  'zambarau', 'pink', 'kahawia', 'kijivu', 'bluu ya mwanga', 'bluu ya giza', 
                  'kijani cha giza', 'kijani kibichi', 'krimu', 'maruni', 'dhahabu', 'fedha', 
                  'rangi'],
        'fruits': ['wali', 'maharagwe', 'mahindi', 'ugali', 'chapati', 'mkate', 'nyama', 'kuku', 
                'samaki', 'maziwa', 'maji', 'chai', 'ndizi', 'embe', 'chungwa', 'nanasi', 
                'viazi', 'viazi vitamu', 'sukari', 'chumvi'],
        'family': ['mama', 'baba', 'kaka', 'dada', 'mtoto', 'mwana', 'binti', 'babu', 'bibi', 
                  'mjomba', 'shangazi', 'binamu', 'mzazi', 'ndugu', 'mke', 'mume', 
                  'mama wa kambo', 'baba wa kambo', 'familia']
    }
    
    # Generate images for each category
    for category, words in categories.items():
        for word in words:
            output_path = f'static/images/{category}/{word}.jpeg'
            create_placeholder_image(word, output_path)

if __name__ == '__main__':
    generate_all_placeholders() 