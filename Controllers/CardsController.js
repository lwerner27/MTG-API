const { ObjectId } = require("bson");
const { getDb } = require("../database")


module.exports = {
    getAllCardNames: async () => {
        Cards = getDb().collection('Cards')
        try {
            let count = 0
            const allCardNames = await Cards.find({}, {name: 1, _id: 1}).toArray();
            allCardNames.forEach(element => {
                count++
                console.log(`${count}: ${element.name}, ${element._id}`)
            });
            
        } catch (error) {
            console.error('Error getting documents:', error);
        }
    }, 

    getAllUniqueCardNames: async () => {
        Cards = getDb().collection('Cards')
        try {
            let count = 0
            const allUniqueCardNames = await Cards.distinct("name", {}, {name: 1, _id: 0})

            allUniqueCardNames.forEach(card => {
                count++ 
                console.log(`${count}: ${card}`)
            })
            
        } catch (error) {
            console.error('Error getting documents:', error);
        }
    },

    getCard: async (req, res) => {
        Cards = getDb().collection('Cards')
        const card = await Cards.findOne({_id: new ObjectId(req.params.cardId)})
        res.redirect(`https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${card.multiverseId}`)
    }
}