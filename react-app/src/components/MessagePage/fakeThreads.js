export const threads = {
    1: {
        id: 1,
        name: 'thread one',
        users: {
            1: {
                id: 1,
                userId: 7,
                handle: 'lipp',
                firstName: 'Madi',
                lastName: 'Mippmann',
                profileImageURL: 'https://mooa.s3.amazonaws.com/235598b667702be9ce6136682d2acf4f166428dd'
            },
            2: {
                id: 2,
                userId: 8,
                handle: 'the_chair',
                firstName: 'Alec',
                lastName: 'Keeler',
                profileImageURL: 'https://mooa.s3.amazonaws.com/0d189089194291078a08a145fcaf42d82aee5b9d'
            }
        },
        messages: [
            {
                id: 1,
                userId: 7,
                content: 'madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi madi',
                createdAt: '2022-03-30 10:00:00'
            },
            {
                id: 2,
                userId: 7,
                content: 'madi madi madi madi madi madi',
                createdAt: '2022-03-30 9:00:00'
            },
            {
                id: 3,
                userId: 8,
                content: 'alec alec alec',
                createdAt: '2022-03-30 10:00:00'
            },
            {
                id: 4,
                userId: 7,
                content: 'madi',
                createdAt: '2022-03-30 9:00:00'
            },
            {
                id: 5,
                userId: 8,
                content: 'alec alec alec alec alec alec alec alec alec alec alec alec 🪑',
                createdAt: '2022-03-30 10:00:00'
            },
        ]
    },
    2: {},
    3: {}
}
