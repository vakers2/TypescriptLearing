import FormatString, { joinRows, parseFormatType, StringRowFormattingType } from '../modules/stringFormatter';
import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';

@suite class StringFormatterTest {
    private text: string;
    private maxRowLength: number;
    private maxRowCount: number;

    before() {
        this.text = 'Hello world! It\'s unit testing.';
        this.maxRowLength = 14;
        this.maxRowCount = 2;
    }

    @test 'Parse format type should return enum with correct value' () {
        expect(parseFormatType('0')).
            to.be.equal(StringRowFormattingType.WrapByWord);
    }

    @test 'Parse format type should return default enum with incorrect value' () {
        expect(parseFormatType('5')).
        to.be.equal(StringRowFormattingType.WrapByWord);
    }

    @test 'Format with no max row length' () {
        expect(FormatString(this.text, undefined, this.maxRowCount, StringRowFormattingType.WrapByWord)).
            to.be.equal('Hello world! It\'s unit testing.');
    }

    @test 'Format with no max row count' () {
        expect(FormatString(this.text, this.maxRowLength, undefined, StringRowFormattingType.WrapByWord)).
            to.be.equal('Hello world!\n It\'s unit\n testing.');
    }

    @test 'Format by word' () {
        expect(FormatString(this.text, this.maxRowLength, this.maxRowCount, StringRowFormattingType.WrapByWord)).
            to.be.equal('Hello world!\n It\'s unit');
    }

    @test 'Format by symbol' () {
        expect(FormatString(this.text, this.maxRowLength, this.maxRowCount, StringRowFormattingType.WrapBySymbol)).
            to.be.equal('Hello world! I\nt\'s unit testi');
    }

    @test 'Format with no wrap' () {
        expect(FormatString(this.text, this.maxRowLength, this.maxRowCount, StringRowFormattingType.NoWrap)).
            to.be.equal('Hello world! I');
    }

    @test 'Format by sentence' () {
        expect(FormatString(this.text, this.maxRowLength, this.maxRowCount, StringRowFormattingType.WrapBySentence)).
            to.be.equal('Hello world!');
    }

    @test 'JoinRows should join array with new line delimiter' () {
        expect(joinRows(['Unit', 'testing'])).
        to.be.equal('Unit\ntesting');
    }
}
