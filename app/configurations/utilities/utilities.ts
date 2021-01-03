export const isNotPositiveNumberOrBellowZero = (number: number) :boolean => {
    return isNaN(number) || number <= 0;
}
