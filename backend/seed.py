
from app import db, create_app 
from app.models.models import Lesson


app = create_app()  

with app.app_context():
  words_data = [
    {"content": "mbwa", "category": "Animals", "title": "Animal", "image_url": "/static/images/mbwa.jpeg"},
    {"content": "paka", "category": "Animals", "title": "Animal", "image_url": "/static/images/paka.jpeg"},
    {"content": "ndege", "category": "Animals", "title": "Animal", "image_url": "/static/images/ndege.jpeg"},

    # Food
    {"content": "mkate", "category": "Food", "title": "Food", "image_url": "/static/images/mkate.jpeg"},
    {"content": "maji", "category": "Food", "title": "Food", "image_url": "/static/images/maji.jpeg"},
    {"content": "samaki", "category": "Food", "title": "Food", "image_url": "/static/images/samaki.jpeg"},

    # Colors
    {"content": "kijani", "category": "Colors", "title": "Color", "image_url": "/static/images/kijani.jpeg"},
    {"content": "nyeupe", "category": "Colors", "title": "Color", "image_url": "/static/images/nyeupe.jpeg"},
    {"content": "nyeusi", "category": "Colors", "title": "Color", "image_url": "/static/images/nyeusi.jpeg"},

    # Verbs
    {"content": "lala", "category": "Verbs", "title": "Verb", "image_url": "/static/images/lala.jpeg"},
    {"content": "soma", "category": "Verbs", "title": "Verb", "image_url": "/static/images/soma.jpeg"},
    {"content": "cheza", "category": "Verbs", "title": "Verb", "image_url": "/static/images/cheza.jpeg"},
]


    for word in words_data:
        lesson=Lesson(
            title=word["title"],
            category=word["category"],
            content=word["content"],
            audio_url=None,
            image_url=word.get("image_url")
        )
        db.session.add(lesson)
  
    letters = [l for l in "BCDFGHJKLMNPQRSTVWXYZ"] 

    for letter in letters:
        existing = Lesson.query.filter_by(category="Alphabets", content=letter).first()
        if not existing:
           lesson = Lesson(
            title="Alphabets",
            category="Alphabets",
            content=letter,
            audio_url=None,
            image_url=None
        )
        db.session.add(lesson)

    db.session.commit()
    print("Alphabets seeded successfully.")
