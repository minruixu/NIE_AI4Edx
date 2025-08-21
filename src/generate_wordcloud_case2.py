import csv
import json
import re
from collections import Counter
import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

def process_csv_for_wordcloud(csv_file_path):
    # Read the CSV file
    text_content = ""
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        # Read the entire file as text
        text_content = file.read()
    
    # Clean and tokenize the text
    text_content = text_content.lower()
    # Remove special characters and numbers
    text_content = re.sub(r'[^\w\s]', '', text_content)
    text_content = re.sub(r'\d+', '', text_content)
    
    # Tokenize the text
    tokens = word_tokenize(text_content)
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    additional_stop_words = {'the', 'and', 'of', 'to', 'in', 'a', 'is', 'that', 'for', 'on', 'with', 'as', 'by', 'dr', 'prof', 'mr', 'ms', 'ai', 'using', 'used', 'use'}
    stop_words.update(additional_stop_words)
    filtered_tokens = [word for word in tokens if word not in stop_words and len(word) > 1]
    
    # Count word frequencies
    word_counts = Counter(filtered_tokens)
    
    # Get the top 100 words
    top_words = word_counts.most_common(100)
    
    # Prepare data for JSON
    word_cloud_data = [{"text": word, "value": count} for word, count in top_words]
    
    return word_cloud_data

def save_to_json(data, output_path):
    with open(output_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2)

if __name__ == "__main__":
    input_csv = "src/data/nie_case2.csv"
    output_json = "src/data/nie_case2_wordcloud.json"
    public_output_json = "public/data/nie_case2_wordcloud.json"
    
    # Make sure we're in the project root directory
    if not os.path.exists(input_csv):
        # Try with ntu-clone prefix
        input_csv = "ntu-clone/src/data/nie_case2.csv"
        output_json = "ntu-clone/src/data/nie_case2_wordcloud.json"
        public_output_json = "ntu-clone/public/data/nie_case2_wordcloud.json"
    
    # Create public/data directory if it doesn't exist
    os.makedirs(os.path.dirname(public_output_json), exist_ok=True)
    
    word_cloud_data = process_csv_for_wordcloud(input_csv)
    save_to_json(word_cloud_data, output_json)
    save_to_json(word_cloud_data, public_output_json)
    print(f"Word cloud data saved to {output_json} and {public_output_json}") 