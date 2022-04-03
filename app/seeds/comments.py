from app.models import db, Comment

def seed_comments():
    comment1 = Comment(postId="11", userId="3", content="Illum quia tenetur dolorem dolor et id nostrum vero.") 
    comment2 = Comment(postId="9", userId="4", content="Et laborum voluptas aut. In et nemo et dolores quia.") 
    comment3 = Comment(postId="38", userId="4", content="Sed sed est excepturi consequatur repellendus atque id.") 
    comment4 = Comment(postId="17", userId="2", content="In ut odio architecto velit debitis totam odit dolorem. Et excepturi sint et minima rerum nulla.") 
    comment5 = Comment(postId="1", userId="1", content="Neque modi architecto ratione tempora sit sapiente non aperiam perspiciatis.") 
    comment6 = Comment(postId="14", userId="2", content="Nihil neque qui eum occaecati qui voluptas. Nihil assumenda et ducimus temporibus odit sed dolorem.") 
    comment7 = Comment(postId="10", userId="2", content="Accusamus qui qui minima alias explicabo consequatur.") 
    comment8 = Comment(postId="36", userId="1", content="Qui est optio laborum dolorem. Quae et doloremque perferendis.") 
    comment9 = Comment(postId="31", userId="2", content="Ut quod laboriosam beatae omnis et.") 
    comment10 = Comment(postId="33", userId="1", content="Ut enim iure. Harum perferendis repudiandae explicabo eum nulla.") 
    comment11 = Comment(postId="10", userId="4", content="Et rerum labore ipsam qui saepe quos qui laborum inventore.") 
    comment12 = Comment(postId="14", userId="2", content="Quae voluptates officiis perferendis qui vitae. Quis accusantium unde error quas perspiciatis.") 
    comment13 = Comment(postId="11", userId="2", content="Dicta odit officiis nihil.") 
    comment14 = Comment(postId="38", userId="1", content="Enim ipsum sunt cum provident voluptas sequi atque id ut. Consequuntur eos dolor.") 
    comment15 = Comment(postId="23", userId="3", content="Consectetur odit inventore quasi.") 
    comment16 = Comment(postId="21", userId="1", content="Nostrum consequatur aut molestiae praesentium ducimus distinctio voluptatem repellat voluptatem. Tenetur sed officiis magni placeat ullam.") 
    comment17 = Comment(postId="23", userId="1", content="Quasi neque animi repudiandae et itaque perspiciatis consequuntur sed quasi.") 
    comment18 = Comment(postId="3", userId="2", content="Veniam aperiam officia itaque. Quo aut et harum quia ex eaque sed maxime.") 
    comment19 = Comment(postId="5", userId="3", content="Deleniti cumque veritatis recusandae iure architecto.") 
    comment20 = Comment(postId="18", userId="2", content="Cumque quia sunt voluptatem. Maxime nisi aut eveniet non delectus eius odit est.") 
    comment21 = Comment(postId="23", userId="1", content="Tempora aut necessitatibus.") 
    comment22 = Comment(postId="8", userId="1", content="Nemo ut et. Ea quidem molestiae at officiis est.") 
    comment23 = Comment(postId="30", userId="1", content="Voluptate asperiores commodi fuga odio.") 
    comment24 = Comment(postId="6", userId="1", content="Eum veritatis alias alias in. Ducimus quae voluptas rerum nihil corporis pariatur.") 
    comment25 = Comment(postId="27", userId="2", content="Sit odio iste earum.") 
    comment26 = Comment(postId="3", userId="4", content="Laboriosam repudiandae vel sed ut a id. Debitis ut et deleniti non fugit velit omnis.") 
    comment27 = Comment(postId="29", userId="4", content="Enim dolorum quam unde reiciendis nobis nisi explicabo.") 
    comment28 = Comment(postId="4", userId="4", content="Aperiam aut dolor saepe voluptate voluptatum suscipit vel. Doloribus iure laboriosam eaque ut quis deleniti.") 
    comment29 = Comment(postId="19", userId="2", content="Molestias deserunt rem sed quasi.") 
    comment30 = Comment(postId="15", userId="1", content="Eos ullam tenetur inventore non eos animi. Eum facere omnis quam fuga iste dolor suscipit sunt magni.") 
    comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20, comment21, comment22, comment23, comment24, comment25, comment26, comment27, comment28, comment29, comment30]

    for comment in comments:
        db.session.add(comment)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
