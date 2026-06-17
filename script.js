'use strict';

const reviewInput = document.getElementById('reviewInput');
const reviewOutput = document.getElementById('reviewOutput');
const duplicateOutput = document.getElementById('duplicatedReviews');
const inputCount = document.getElementById('inputCount');
const outputCount = document.getElementById('outputCount');
const duplicateCount = document.getElementById('duplicateCount');
const checkBtn = document.getElementById('btnCheck');
const clearBtn = document.getElementById('btnClear');
const copyBtn = document.getElementById('copy-button');
const duplicateCopyBtn = document.getElementById('duplicate-copy-button');

const duplicateCheck = function () {
  if (!reviewInput.value) return;
  const reviews = reviewInput.value.split('\n').map(rev => rev.trim());

  const tracker = [];
  const duplicates = [];
  const result = [];

  reviews.forEach(review => {
    const checked = review
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();

    if (!tracker.includes(checked)) {
      result.push(review);
      tracker.push(checked);
    } else if (tracker.includes(checked)) {
      duplicates.push(review);
    }
  });

  const sortedDuplicates = duplicates.sort((a, b) => a.localeCompare(b));

  reviewOutput.value = result.join('\n');
  duplicateOutput.value = sortedDuplicates.join('\n');
  inputCount.textContent = `Lines: ${reviews.length}`;
  outputCount.textContent = `Lines: ${result.length}`;
  duplicateCount.textContent = `Lines: ${duplicates.length}`;
};

const cleanUI = function () {
  reviewInput.value = '';
  reviewOutput.value = '';
  duplicateOutput.value = '';
  inputCount.textContent = `Lines: 0`;
  outputCount.textContent = `Lines: 0`;
  duplicateCount.textContent = `Lines: 0`;
};

const copyToClipboard = function () {
  if (!reviewOutput.value) return;
  navigator.clipboard.writeText(reviewOutput.value);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.textContent = 'Copy Reviews';
  }, 4000);
};

const copyDuplicatesToClipboard = function () {
  if (!duplicateOutput.value) return;
  navigator.clipboard.writeText(duplicateOutput.value);
  duplicateCopyBtn.textContent = 'Copied!';
  setTimeout(() => {
    duplicateCopyBtn.textContent = 'Copy Duplicates';
  }, 4000);
};

checkBtn.addEventListener('click', duplicateCheck);
clearBtn.addEventListener('click', cleanUI);
copyBtn.addEventListener('click', copyToClipboard);
duplicateCopyBtn.addEventListener('click', copyDuplicatesToClipboard);
