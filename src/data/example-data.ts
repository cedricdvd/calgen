export interface ClassDetails {
    Days: string;
    Time: string;
    Building?: string;
    Room?: string;
}

export interface ExamDetails {
    Date: string,
    Days: string,
    Time: string,
    Building?: string,
    Room?: string
}

export interface SectionDetails {
    LE?: Record<string, ClassDetails>;
    LA?: Record<string, ClassDetails>;
    DI?: Record<string, ClassDetails>;
    ST?: Record<string, ClassDetails>;
    FI?: ExamDetails;
    MI?: ExamDetails[];
}

type Courses = Record<string, Record<string, SectionDetails>>;

const exampleClasses: Courses = {
    'COGS 108': {
        'A00': {
            LE: {'A00': {Days: 'MWF', Time: '10:00a-10:50a', Building: 'GH', Room: '242'}},
            LA: {
                'A01': {Days: 'M', Time: '10:00a-10:50a', Building: 'CENTR', Room: '222'},
                'A02': {Days: 'M', Time: '11:00a-11:50a', Building: 'CENTR', Room: '222'},
                'A03': {Days: 'M', Time: '12:00a-12:50a', Building: 'WLH', Room: '2111'},
                'A04': {Days: 'M', Time: '2:00a-2:50a', Building: 'CSB', Room: '005'},
                'A05': {Days: 'M', Time: '3:00p-3:50p', Building: 'CSB', Room: '005'},
                'A06': {Days: 'M', Time: '4:00p4:50p', Building: 'PETER', Room: '102'},
                'A07': {Days: 'W', Time: '2:00p-2:50p', Building: 'CSB', Room: '005'}
            },
            FI: {Days: 'F', Time: '8:00a-10:59a', Date: '12/13/2024'}
        },
        'B00': {
            LE: {'B00': {Days: 'MWF', Time: '2:00p-2:50p', Building: 'YORK', Room: '2722'}},
            LA: {
                'B01': {Days: 'W', Time: '9:00a-9:50a', Building: 'YORK', Room: '4080A'},
                'B02': {Days: 'F', Time: '3:00p-3:50p', Building: 'PCYNH', Room: '120'},
                'B03': {Days: 'F', Time: '4:00p-4:50p', Building: 'PCYNH', Room: '120'},
                'B04': {Days: 'W', Time: '4:00p-4:50p', Building: 'DIB', Room: '122'},
                'B05': {Days: 'W', Time: '5:00p-5:50p', Building: 'WLH', Room: '2207'},
                'B06': {Days: 'W', Time: '3:00p4350p', Building: 'CSB', Room: '004'},
                'B07': {Days: 'W', Time: '6:00p-6:50p', Building: 'WLH', Room: '2207'}
            },
            FI: {Days: 'W', Time: '3:00p-5:59p', Date: '12/11/2024'}
        }
    },
    'MATH 20C': {
        'A00': {
            LE: {'A00': {Days: 'TuTh', Time: '9:30a-10:50a', Building: 'JEANN', Room: 'AUD'}},
            DI: {
                'A01': {Days: 'W', Time: '4:00p-4:50p', Building: 'PODEM', Room: '1A20'},
                'A02': {Days: 'W', Time: '4:00p-4:50p', Building: 'PODEM', Room: '1A20'},
                'A03': {Days: 'W', Time: '4:00p-4:50p', Building: 'PODEM', Room: '1A20'},
                'A04': {Days: 'W', Time: '4:00p-4:50p', Building: 'PODEM', Room: '1A20'}
            },
            MI: [
                {Days: 'Th', Time: '9:00p-9:50p', Date: '10/24/2024', Building: 'PETER', Room: '108'},
                {Days: 'Th', Time: '9:00p-9:50p', Date: '11/21/2024', Building: 'PETER', Room: '108'}
            ],
            FI: {Days: 'S', Time: '7:00p-9:59p', Date: '12/07/2024'}
        },
        'B00': {
            LE: {'B00': {Days: 'MWF', Time: '8:00a-8:50a', Building: 'WLH', Room: '2005'}},
            DI: {
                'B01': {Days: 'W', Time: '8:00p-8:50p', Building: 'DIB', Room: '121'},
                'B02': {Days: 'W', Time: '5:00p-5:50p', Building: 'DIB', Room: '121'},
                'B03': {Days: 'W', Time: '6:00p-6:50p', Building: 'DIB', Room: '121'},
                'B04': {Days: 'W', Time: '7:00p-7:50p', Building: 'DIB', Room: '121'}
            },
            MI: [
                {Days: 'Th', Time: '9:00p-9:50p', Date: '10/24/2024', Building: 'LEDDN', Room: 'AUD'},
                {Days: 'Th', Time: '9:00p-9:50p', Date: '11/21/2024', Building: 'LEDDN', Room: 'AUD'}
            ],
            FI: {Days: 'S', Time: '7:00p-9:59p', Date: '12/07/2024'}
        },
        'C00': {
            LE: {'C00': {Days: 'MWF', Time: '4:00p-4:50p', Building: 'CENTR', Room: '119'}},
            DI: {
                'C01': {Days: 'W', Time: '5:00p-5:50p', Building: 'APM', Room: '7321'},
                'C02': {Days: 'W', Time: '6:00p-6:50p', Building: 'APM', Room: '7321'},
                'C03': {Days: 'W', Time: '7:00p-7:50p', Building: 'APM', Room: '7321'},
                'C04': {Days: 'W', Time: '8:00p-8:50p', Building: 'APM', Room: '7321'}
            },
            MI: [
                {Days: 'Th', Time: '9:00p-9:50p', Date: '10/24/2024', Building: 'CENTR', Room: '115'},
                {Days: 'Th', Time: '9:00p-9:50p', Date: '11/21/2024', Building: 'CENTR', Room: '115'}
            ],
            FI: {Days: 'S', Time: '7:00p-9:59p', Date: '12/07/2024'}
        }
    },
    'CSE 120': {
        'A00': {
            LE: {'A00': {Days: 'TuTh', Time: '8:00a-9:20a', Building: 'MOS', Room: '0114'}},
            DI: {
                'A01': {Days: 'M', Time: '5:00p-5:50p', Building: 'PETER', Room: '110'}
            },
            FI: {Days: 'Tu', Time: '8:00a-10:59a', Date: '12/10/2024'}
        }
    },
    'CSE 170': {
        'A00': {
            LE: {'A00': {Days: 'MWF', Time: '1:00p-1:50p', Building: 'CENTR', Room: '105'}},
            ST: {
                'A01': {Days: 'Th', Time: '2:00p-3:50p', Building: 'EBU3B', Room: '4258'},
                'A02': {Days: 'Th', Time: '4:00p-5:50p', Building: 'EBU3B', Room: '4258'},
                'A03': {Days: 'F', Time: '9:00a-10:50a', Building: 'EBU3B', Room: '4258'},
                'A04': {Days: 'F', Time: '11:00a-12:50p', Building: 'EBU3B', Room: '4258'},
                'A05': {Days: 'F', Time: '2:00p-3:50p', Building: 'EBU3B', Room: '4258'},
                'A06': {Days: 'F', Time: '4:00p-5:50p', Building: 'EBU3B', Room: '4258'},
                'A07': {Days: 'F', Time: '9:00a-10:50a', Building: 'EBU3B', Room: '4140'}
            },
            FI: {Days: 'M', Time: '11:30a-2:29p', Date: '12/09/2024'}
        }
    }
}

export default exampleClasses;
