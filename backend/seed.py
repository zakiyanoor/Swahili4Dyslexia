
from app import db, create_app 
from app.models.models import Lesson


app = create_app()  

with app.app_context():
  
    letters = [l for l in "BCDFGHJKLMNPQRSTVWXYZ"] 

    for letter in letters:
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
