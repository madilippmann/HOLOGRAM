from app.models import db, Message

def seed_messages():
    #  Thread 1, users 1 and 2
    message1 = Message(userId=1, threadId=1, content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    message2 = Message(userId=2, threadId=1, content='Lorem ipsum dolor sit amet')
    message3 = Message(userId=2, threadId=1, content='😳')
    message4 = Message(userId=1, threadId=1, content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam vel quam. Mi tempus imperdiet nulla malesuada.')
    message5 = Message(userId=2, threadId=1, content='quam')
    message6 = Message(userId=1, threadId=1, content='Lorem ipsum dolor sit amet, consectetur adipiscing elit,')
    message7 = Message(userId=2, threadId=1, content='et dolore magna aliqua. Mi in nulla posuere sollicitudin aliquam ultrices.')
    message8 = Message(userId=1, threadId=1, content='Quis atque et ducimus perspiciatis hic adipisci voluptatibus 33 deserunt voluptatum? Est')
    message9 = Message(userId=1, threadId=1, content='Qui consequuntur voluptatem qui iusto veritatis et nihil quas et maxime odio. Cum blanditiis rerum et molestiae Quis vel quas cupiditate ut Quis aliquid in eius magni.')
    message10 = Message(userId=1, threadId=1, content='autem eum dignissimos')
    message11 = Message(userId=2, threadId=1, content='ut minus  👹')

    #  Thread 2, users 1, 3, and 4
    message12 = Message(userId=1, threadId=2, content='Lorem ipsum dolor sit amet. Ut enim tempora ut adipisci voluptas 33 vero dolorum eum quia perspiciatis. In architecto fugiat est soluta vero ad debitis recusandae aut dolorem saepe non quam veniam. Eos neque amet molestiae numquam et fugiat iste.')
    message13 = Message(userId=1, threadId=2, content='Cum rerum et iure omnis a quam accusamus aut incidunt ullam et nemo nisi. Ea amet laborum et rerum maiores eos nisi odit ut sint voluptatum. Et tempore iusto aut illo consequuntur ut quae numquam aut nesciunt nulla qui enim earum? Ea nesciunt sint et quas expedita sed quae nihil ut nihil corrupti id amet iure et molestiae necessitatibus.')
    message14 = Message(userId=1, threadId=2, content='Ut voluptatem unde eum animi quibusdam quo velit voluptatem aut ducimus voluptatibus et voluptatum. ')
    message15 = Message(userId=3, threadId=2, content='Est dolor magnam non consequuntur sint qui ipsam totam aut fugiat quidem sit amet ratione et perspiciatis nihil et quia quidem.')
    message16 = Message(userId=4, threadId=2, content='Rem numquam commodi ut dolorem ipsam et autem explicabo aut eligendi natus aut sequi ipsa a impedit obcaecati.')
    message17 = Message(userId=3, threadId=2, content='Et voluptas consequatur et quas illo et saepe beatae ea ratione omnis ab iste blanditiis. ')
    message18 = Message(userId=4, threadId=2, content='Et facere')
    message19 = Message(userId=4, threadId=2, content='error in nulla nihil ut')
    message20 = Message(userId=3, threadId=2, content='no')
    message21 = Message(userId=1, threadId=2, content='beatae et velit galisum ab')
    message22 = Message(userId=4, threadId=2, content='eveniet ')
    message23 = Message(userId=3, threadId=2, content='vet')
    message24 = Message(userId=3, threadId=2, content='Sit autem doloremque ut consequuntur voluptatem aut beatae consequatur ea nisi praesentium?')
    message25 = Message(userId=1, threadId=2, content='Qui similique')
    message26 = Message(userId=1, threadId=2, content='perferendis sit velit voluptas sed modi velit nam error voluptatibus vel ullam aliquid ut mollitia earum')
    message27 = Message(userId=1, threadId=2, content='placeat.')

    #  Thread 3, users 1 and 3
    message28 = Message(userId=3, threadId=3, content='Est animi voluptatem ea doloremque quisquam')
    message29 = Message(userId=1, threadId=3, content='At totam')
    message30 = Message(userId=3, threadId=3, content='repellat')
    message31 = Message(userId=1, threadId=3, content='At necessitatibus dolor ut numquam doloribus vel quos quaerat')
    message32 = Message(userId=3, threadId=3, content='Et odio odit sit fuga voluptatem non praesentium dicta et ipsa nobis sit voluptatem reiciendis et totam nihil ut facilis cumque?')
    message33 = Message(userId=3, threadId=3, content='Eum enim blanditiis ut explicabo eaque aut corporis sequi.')
    message34 = Message(userId=1, threadId=3, content='At aliquam inventore')
    message35 = Message(userId=1, threadId=3, content='Eum molestiae ratione aut odit repellendus qui cupiditate quod.')
    message36 = Message(userId=3, threadId=3, content='qui minus saepe a tenetur nulla')
    message37 = Message(userId=1, threadId=3, content='Vel velit nihil')
    message38 = Message(userId=3, threadId=3, content='ad dolorem saepe')
    message39 = Message(userId=1, threadId=3, content='et cupiditate dolores')

    #  Thread 4, users 1 and 4
    message40 = Message(userId=4, threadId=4, content='Aliquam numquam aut accusantium consequatur rem repudiandae fugit placeat sint aut alias accusantium. Ab laudantium quibusdam in nobis inventore sit magni necessitatibus ut enim dolore.')
    message41 = Message(userId=1, threadId=4, content='Ea earum asperiores a ipsum obcaecati ea voluptas galisum non alias dolorum! Qui repudiandae dignissimos et praesentium molestias ut mollitia veritatis. Et omnis sequi sed dolor cupiditate ex blanditiis officia et error explicabo qui quisquam velit. Commodi recusandae aut deserunt laborum qui quibusdam quae et voluptas dolor id voluptatum quibusdam.')

    #  Thread 5, users 1 and 6
    message42 = Message(userId=1, threadId=5, content='Qui quod consequatur ex quia quis et voluptatem pariatur qui saepe dolores.')
    message43 = Message(userId=1, threadId=5, content='Sit enim fugiat et ullam molestias hic quia tempore nam optio excepturi. Nam asperiores accusamus et galisum nobis est blanditiis praesentium ex veniam beatae aut internos nulla ut nemo dolorem. Non soluta ipsum qui iure nihil in perspiciatis numquam et quibusdam itaque.')


    #  Thread 6, users 1 and 5
    message44 = Message(userId=5, threadId=6, content='Ut iusto dolorem ')
    message45 = Message(userId=1, threadId=6, content='non necessitatibus')
    message46 = Message(userId=5, threadId=6, content='voluptatem et minima')

    #  Thread 7, users 1 and 7
    message47 = Message(userId=7, threadId=7, content='At inventore repudiandae qui veniam aliquid. Eos possimus soluta aut laboriosam voluptas et pariatur excepturi a omnis nobis 33 quasi internos quo aperiam molestias a sequi voluptas. Sit repudiandae illo non error maiores aut fugit autem qui dolor autem!')

    messages = [message1, message2, message3, message4, message5,
                message6, message7, message8, message9, message10,
                message11, message12, message13, message14, message15,
                message16, message17, message18, message19, message20,
                message21, message22, message23, message24, message25,
                message26, message27, message28, message29, message30,
                message31, message32, message33, message34, message35,
                message36, message37, message38, message39, message40,
                message41, message42, message43, message44, message45,
                message46, message47]

    for message in messages:
        db.session.add(message)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
