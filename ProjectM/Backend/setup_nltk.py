"""
One-time setup script to download required NLTK data packages.
Run this before starting the Flask server for the first time.
"""
import nltk

def download_nltk_data():
    packages = ['vader_lexicon', 'stopwords', 'punkt', 'punkt_tab']
    for pkg in packages:
        print(f"Downloading {pkg}...")
        nltk.download(pkg, quiet=False)
    print("\nAll NLTK data packages downloaded successfully!")

if __name__ == '__main__':
    download_nltk_data()
