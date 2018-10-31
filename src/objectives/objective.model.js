export function createObjective(name, category = '',
  startDate = Date.now(), type = TermType.undefined, )
{
  this.name = name;
  this.startDate = startDate;
  this.type = type;
  this.category = category
}
 
export function saveObjective(objective) {
  const savedObjectives = localStorage.get('objectives');
  
  if (!savedObjectives) {
    savedObjectives = [];
  }

  savedObjectives.push(objective);

  localStorage.set('objectives', savedObjectives);
}

export function modifyObjective(objective, params) {
  let resultantObjective = { ...objective };

  if (params.hasOwnProperty('name')) {
    resultantObjective.name = params.name;
  }

  if (params.hasOwnProperty('startDate')) {
    resultantObjective.startDate = params.startDate;
  }

  if (params.hasOwnProperty('endDate')) {
    resultantObjective.endDate = params.endDate;
  }

  if (params.hasOwnProperty('category')) {
    resultantObjective.category = params.category;
  }

  if (params.hasOwnProperty('type')) {
    resultantObjective.type = params.type;
  }

  return resultantObjective;
}

export const TermType = {
  short: 0,
  medium: 1,
  large: 2,
  historical: 3,
  undefined: undefined
};