export function ageParser(birthday) {
    const age = new Date().getFullYear() - new Date(birthday).getFullYear() + 1
    return age
}