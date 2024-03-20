/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2pt08ehe7lcqgzf")

  collection.name = "target_co_ords"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uhvaxgom",
    "name": "difficulty",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2pt08ehe7lcqgzf")

  collection.name = "easy_co_ords"

  // remove
  collection.schema.removeField("uhvaxgom")

  return dao.saveCollection(collection)
})
