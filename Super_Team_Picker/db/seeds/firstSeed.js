/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const faker = require('faker');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('cohorts')
  .del()
  .then(function () {
    const cohorts = Array.from({length: 10}).map(() => {
      result = []
      for(let i= 0 ; i < 20 ;i++){
        result.push(" "+faker.name.firstName())
      }
      return {
        name: faker.name.findName(),
        logoUrl: faker.image.imageUrl(),
        members: result.join(),
      }
    })
    return knex('cohorts').insert(cohorts)
  })
};
