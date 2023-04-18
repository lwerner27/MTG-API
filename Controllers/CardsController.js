const { ObjectId } = require("bson");
const { getDb } = require("../database")
const fs = require("fs")


module.exports = {
    getAllCardNames: async (req, res) => {
        Cards = getDb().collection('Cards')
        try {
            let count = 0
            const allCardNames = await Cards.find({}, {name: 1, _id: 1}).toArray();
            allCardNames.forEach(element => {
                count++
                console.log(`${count}: ${element.name}, ${element._id}`)
            });
            res.sendStatus(200)
            
        } catch (error) {
            console.error('Error getting documents:', error);
            res.sendStatus(500)
        }
    }, 

    getAllUniqueCardNames: async (req, res) => {
        Cards = getDb().collection('Cards')
        try {
            const allUniqueCardNames = await Cards.distinct("name")

            res.send({data: allUniqueCardNames})
            
        } catch (error) {
            console.error('Error getting documents:', error);
            res.sendStatus(500)
        }
    },

    getCard: async (req, res) => {
        Cards = getDb().collection('Cards')
        const card = await Cards.findOne({_id: new ObjectId(req.params.cardId)})
        res.redirect(`https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${card.multiverseId}`)
    },

    getCardByName: async (req, res) => {
        Cards = getDb().collection("Cards")
        searchCards = await Cards.find({name:req.params.cardName})
        res.sendStatus(200).send(searchedCards)
    }
}