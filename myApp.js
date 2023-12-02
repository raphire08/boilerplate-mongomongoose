require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const doneFunction = (err, data, done) => {
  if (data) {
    done(null, data);
  } else {
    done(err);
  }
}

const person = { name: "Hello", age: 25, favoriteFoods: [] };

const createAndSavePerson = (done) => {
  const document = Person(person)
  document.save((err, data) => doneFunction(err, data, done));
};

const arrayOfPeople = [person];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => doneFunction(err, data, done));
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => doneFunction(err, data, done));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => doneFunction(err, data, done));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => doneFunction(err, data, done));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  const person = Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => doneFunction(err, data, done));
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, data) => doneFunction(err, data, done));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => doneFunction(err, data, done));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => doneFunction(err, data, done));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec((err, data) => doneFunction(err, data, done));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
