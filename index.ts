// Given a set of time intervals in any order, merge all overlapping intervals into one and output the result,
// which should have only mutually exclusive intervals. Let the intervals be represented as pairs of integers
// for simplicity.
//
// For example, let the given set of intervals be {{2,4}, {1,3}, {5,7}, {6,8}}. The intervals {1,3} and {2,4}
// overlap with each other, so they should be merged and become {1, 4}. Similarly {5, 7} and {6, 8} should
// be merged and become {5, 8}.

/*
{2,4}, {1,3}, {5,7}, {6,8}
{1,4}, {5,7}, {6,8}


*/
 

class Interval {
    constructor(public start: number, public end: number) {}
}

function main() {
    const intervals = [
        new Interval(2, 4),
        new Interval(1, 3),
        new Interval(9, 10),
        new Interval(6, 8),
        new Interval(5, 7),
        new Interval(0, 2),
    ];

    const merged = mergeIntervals(intervals);
    printIntervals(merged);
}

function printIntervals(intervals: Interval[]): void {
    console.log("Output:");
    for (const interval of intervals)
        console.log(`[${interval.start},${interval.end}]`);
}

function doIntervalsOverlap(interval1: Interval, interval2: Interval): boolean {
    if (interval1.start > interval2.start && interval1.start < interval2.end)
        return true;
    
    if (interval2.start > interval1.start && interval2.start < interval1.end)
        return true;

    return false;
}

function createMergedInterval(interval1: Interval, interval2: Interval): Interval { 
    const start = Math.min(interval1.start, interval2.start);
    const end = Math.max(interval1.end, interval2.end);

    return new Interval(start, end);
}

function mergeIntervals(intervals: Interval[]): Interval[] {
    const result: Interval[] = [];
    const mergedIntervalsByIndex: { [index: number]: boolean } = {};

    for (let i = 0; i < intervals.length - 1; i++) {
        const intervalA = intervals[i];

        for (let j = i + 1; j < intervals.length; j++) {
            const intervalB = intervals[j];

            if (doIntervalsOverlap(intervalA, intervalB)) {
                // push interval into output array
                result.push(createMergedInterval(intervalA, intervalB));
              
                // mark intervals as merged
                mergedIntervalsByIndex[i] = true;
                mergedIntervalsByIndex[j] = true;

                return mergeIntervals([...result, ...intervals.filter((interval, index) => !mergedIntervalsByIndex[index])]);
            }
        }
    }

    return [...result, ...intervals.filter((interval, index) => !mergedIntervalsByIndex[index])];
}

main();