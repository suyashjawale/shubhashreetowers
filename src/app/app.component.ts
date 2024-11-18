import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleTranslateComponent } from "./google-translate/google-translate.component";
import { FetchdataService } from './fetchdata.service';
import { Maintenance } from './maintenance';
import { jsPDF } from 'jspdf';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, GoogleTranslateComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})

export class AppComponent {
	jsonData: {
		monthName: string,
		totalAmount: string,
		maintenance: Maintenance[]
	}[]
		=
		[
			{
				monthName: "July 2023",
				totalAmount: "2222",
				maintenance: [
					{ "Flat No": '1', "Owner Name": 'John Doe', "Amount": 25, "Status": 'Unpaid', "Payment Date": '2023-10-01' },
					{ "Flat No": '2', "Owner Name": 'Jane Smith Jane Smith Jane Smith Jane Smith Jane Smith Jane SmithJane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '3', "Owner Name": '1Jane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '4', "Owner Name": '2Jane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '5', "Owner Name": 'Jedeane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '6', "Owner Name": 'Janeddd Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '7', "Owner Name": 'Jadfne Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '8', "Owner Name": 'Janed Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '9', "Owner Name": 'Jane sdSmith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '10', "Owner Name": 'Jane Ssdmith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '11', "Owner Name": 'Jane Smisdth', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '12', "Owner Name": 'Janesdd Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '13', "Owner Name": 'Jasdne Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '14', "Owner Name": 'Janesd Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '15', "Owner Name": 'Jane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '16', "Owner Name": 'Jasdsdrfne Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '17', "Owner Name": 'Janeff Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '18', "Owner Name": 'Jane er Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
				]
			},
			{
				monthName: "June 2023",
				totalAmount: "2222",
				maintenance: [
					{ "Flat No": '1', "Owner Name": 'John Doe', "Amount": 25, "Status": 'Unpaid', "Payment Date": '2023-10-01' },
					{ "Flat No": '2', "Owner Name": 'Jane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '3', "Owner Name": '1Jane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '4', "Owner Name": '2Jane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '5', "Owner Name": 'Jedeane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '6', "Owner Name": 'Janeddd Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '7', "Owner Name": 'Jadfne Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '8', "Owner Name": 'Janed Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '9', "Owner Name": 'Jane sdSmith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '10', "Owner Name": 'Jane Ssdmith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '11', "Owner Name": 'Jane Smisdth', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '12', "Owner Name": 'Janesdd Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '13', "Owner Name": 'Jasdne Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '14', "Owner Name": 'Janesd Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '15', "Owner Name": 'Jane Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '16', "Owner Name": 'Jasdsdrfne Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '17', "Owner Name": 'Janeff Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
					{ "Flat No": '18', "Owner Name": 'Jane er Smith', "Amount": 30, "Status": 'Paid', "Payment Date": '2023-10-02' },
				]
			}

		];

	private readonly scaleFactor = 1.5;
	private readonly padding = 50;
	private readonly halfPadding = this.padding / 2;
	private readonly rowHeight = 60;
	private readonly upperMargin = 80;
	private readonly fontFamily = "Trebuchet MS";
	private readonly characterWidth = 15;


	downloadImage(monthIndex: number, tabInd: number, isPDF: boolean = false): Promise<[string, number, number] | void> {
		return new Promise((resolve, reject) => {
			let svgMarkup;
			if (tabInd === 1) {
				svgMarkup = this.generateMaintenanceSVGTable(monthIndex);
			}

			if (svgMarkup !== undefined) {
				const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml' });
				const url = URL.createObjectURL(svgBlob);

				const img = new Image();
				img.crossOrigin = 'anonymous';
				img.onload = () => {
					try {
						const result = this.createCanvasImage(img, url, monthIndex, isPDF);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				};
				img.onerror = (error) => reject(new Error('Failed to load image.'));
				img.src = url;
			} else {
				reject(new Error('SVG markup is undefined.'));
			}
		});
	}


	private createCanvasImage(img: HTMLImageElement, url: string, monthIndex: number, isPDF: boolean): [string, number, number] {
		const canvas = document.createElement('canvas');
		canvas.width = img.width * this.scaleFactor;
		canvas.height = img.height * this.scaleFactor;
		const ctx = canvas.getContext('2d')!;

		ctx.scale(this.scaleFactor, this.scaleFactor);
		ctx.drawImage(img, 0, 0);
		URL.revokeObjectURL(url);

		const dataurl = canvas.toDataURL('image/png', 1.0);
		if (!isPDF) {
			const link = document.createElement('a');
			link.href = dataurl;
			link.download = `${this.jsonData[monthIndex].monthName}.png`;
			link.click();
		}
		return [dataurl, img.width, img.height];
	}


	private generateMaintenanceSVGTable(monthIndex: number): string {
		const data = this.jsonData[monthIndex].maintenance;
		const columnMarkers = [this.halfPadding].concat(this.calculateColumnMarkers(data));
		const canvasWidth = columnMarkers[columnMarkers.length - 1] + this.padding;
		const canvasHeight = this.rowHeight * 20 + this.padding + this.upperMargin;
		const boxWidth = canvasWidth - this.padding;
		const boxHeight = canvasHeight - this.padding - this.upperMargin;

		let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">
		<rect width="100%" height="100%" fill="#ffff" />
		<rect width="${boxWidth}" height="${boxHeight}" x="${this.halfPadding}" y="${this.halfPadding + this.upperMargin}" rx="20" ry="20" fill="white" style="stroke-width:3;stroke:gray" />
		<text x="50%" y="${(this.halfPadding + this.upperMargin) / 2}" alignment-baseline="middle" text-anchor="middle" fill="black" font-weight="550" font-family="${this.fontFamily}" font-size="34">${this.jsonData[monthIndex].monthName}</text>`;

		// Draw horizontal lines
		for (let i = this.rowHeight; i < this.rowHeight * (data.length + 2); i += this.rowHeight) {
			svg += `<line x1="${this.halfPadding}" y1="${this.halfPadding + this.upperMargin + i}" x2="${canvasWidth - this.halfPadding}" y2="${this.halfPadding + this.upperMargin + i}" style="stroke-width:3;stroke:gray" />`;
		}

		// Draw vertical lines
		for (let i = 1; i < columnMarkers.length - 1; i++) {
			svg += `<line x1="${columnMarkers[i]}" y1="${this.halfPadding + this.upperMargin}" x2="${columnMarkers[i]}" y2="${canvasHeight - this.halfPadding - this.rowHeight}" style="stroke-width:3;stroke:gray" />`;
		}

		const objKeys = Object.keys(data[0]);
		for (let i = 0; i < columnMarkers.length - 1; i++) {
			svg += `<text x="${(columnMarkers[i] + columnMarkers[i + 1]) / 2}" y="${this.halfPadding + this.upperMargin + 2 + this.rowHeight / 2}" text-anchor="middle" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25" font-weight="550">${objKeys[i]}</text>`;
		}

		for (let i = 0; i < data.length; i++) {
			let objValues = Object.values(data[i]);

			for (let j = 0; j < columnMarkers.length - 1; j++) {
				if (j == 1) {
					svg += `<text x="${columnMarkers[j] + this.halfPadding}" y="${this.halfPadding + this.upperMargin + this.rowHeight * (i + 1) + 2 + this.rowHeight / 2}" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25">${objValues[j]}</text>`;
				}
				else {
					if (j == 3) {
						svg += `<rect width="${columnMarkers[j + 1] - columnMarkers[j] - this.halfPadding}" height="${this.rowHeight - 10}" x="${columnMarkers[j] + this.halfPadding / 2}" y="${this.halfPadding + this.upperMargin + this.rowHeight * (i + 1) + 5}" rx="10" ry="10" fill="${objValues[j] == "Paid" ? "green" : "red"}" />`;
					}
					svg += `<text x="${(columnMarkers[j] + columnMarkers[j + 1]) / 2}" y="${this.halfPadding + this.upperMargin + this.rowHeight * (i + 1) + 2 + this.rowHeight / 2}" text-anchor="middle" alignment-baseline="middle" fill="${j == 3 ? "white" : "black"}" font-family="${this.fontFamily}" font-size="25">${objValues[j]}</text>`;
				}
			}
		}

		svg += `<text x="${(columnMarkers[0] + columnMarkers[1]) / 2}" y="${boxHeight + this.rowHeight + this.halfPadding - 10}" font-weight="bold" text-anchor="middle" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25">Total</text>`;

		svg += `<text x="${columnMarkers[1] - 29}" y="${boxHeight + this.rowHeight + this.halfPadding - 10}" font-weight="bold" alignment-baseline="middle" fill="black" font-family="${this.fontFamily}" font-size="25">=   ${this.jsonData[monthIndex].totalAmount}</text>`;

		svg += '</svg>';
		return svg;
	}

	private calculateColumnMarkers(data: Maintenance[]): number[] {
		const baseWidths = Object.keys(data[0]).map(key => key.length * this.characterWidth + this.padding);

		for (const row of data) {
			const values = Object.values(row);
			values.forEach((value, i) => {
				baseWidths[i] = Math.max(String(value).length * this.characterWidth + this.padding, baseWidths[i]);
			});
		}

		return baseWidths.map((curr, i, arr) => {
			return arr[i] += arr[i - 1] ? arr[i - 1] : 0
		})

	}

	downloadPdf() {
		throw new Error('Method not implemented.');
	}

	downloadExcel() {
		throw new Error('Method not implemented.');
	}

	downloadOnlyMaintenanceImages() {
		for (let i = 0; i < this.jsonData.length; i++) {
			this.downloadImage(i, 1);
		}
	}

	async downloadOnlyMaintenancePDF() {
		const pdf = new jsPDF();

		const promises = this.jsonData.map((_, i) => this.downloadImage(i, 1, true));

		try {
			const results = await Promise.all(promises);

			results.forEach((data, i) => {
				if (data) {

					let imageWidth = data[1];
					let imageHeight = data[2];
		
					// Calculate appropriate scaling (optional, can be adjusted based on requirements)
					const maxImageWidth = pdf.internal.pageSize.getWidth(); // Get PDF page width
					const maxImageHeight = pdf.internal.pageSize.getHeight() - 20; // Account for margin
		
					let scale = 1;
					if (imageWidth > maxImageWidth || imageHeight > maxImageHeight) {
						scale = Math.min(maxImageWidth / imageWidth, maxImageHeight / imageHeight);
					}
		
					const scaledWidth = imageWidth * scale;
					const scaledHeight = imageHeight * scale;
		
					pdf.addImage(data[0], 'PNG', 0, 0, scaledWidth, scaledHeight);
					if (i < results.length - 1) {
						pdf.addPage();
					}
				}
			});

			pdf.save('MaintenancePDF.pdf');
		} catch (error) {
			console.error('Error generating PDF:', error);
		}
	}
}
